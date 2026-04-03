import React, { useState, useEffect, useRef, useCallback } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import {
    LuBold,
    LuItalic,
    LuStrikethrough,
    LuCode,
    LuHeading2,
    LuTextQuote,
    LuList,
    LuLink,
    LuDownload,
    LuUpload,
    LuSun,
    LuMoon,
    LuX,
} from 'react-icons/lu';
import './MarkdownMaker.css';

// Ensure all HTML generated links safely open in a new tab without exposing the window object
DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if (node.tagName === 'A') {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
    }
});

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

interface TabData {
    id: string;
    name: string;
    content: string;
    scrollTop: number;
}

// Ensure local storage corruption doesn't crash the application
const isValidTab = (tab: any): tab is TabData => {
    return (
        tab &&
        typeof tab === 'object' &&
        typeof tab.id === 'string' &&
        typeof tab.name === 'string' &&
        typeof tab.content === 'string' &&
        typeof tab.scrollTop === 'number'
    );
};

const DEFAULT_TEXT = `Start writing markdown here...

# Heading 1
## Heading 2

**bold** and *italic* text

- List item
- [ ] Task

> Blockquote

\`inline code\`

\`\`\`
code block
\`\`\`

[Link](url) and ![Image](url)

| Col 1 | Col 2 |
|-------|-------|
| A     | B     |
`;

export default function MarkdownMaker() {
    const [tabs, setTabs] = useState<TabData[]>([]);
    const [activeTabId, setActiveTabId] = useState<string>('');
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [view, setView] = useState<'split' | 'editor' | 'preview'>('split');
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [lineInfo, setLineInfo] = useState({ ln: 1, col: 1 });
    const [htmlPreview, setHtmlPreview] = useState('');
    const [dirtyTabs, setDirtyTabs] = useState<Set<string>>(new Set());

    // Resizing State
    const [splitFraction, setSplitFraction] = useState(0.5);
    const panelsRef = useRef<HTMLDivElement>(null);
    const isResizing = useRef(false);

    const editorRef = useRef<HTMLTextAreaElement>(null);
    // File Handlers
    const fileHandles = useRef(new Map<string, any>());
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Init
    useEffect(() => {
        const savedTabs = localStorage.getItem('mdmaker-tabs');
        const active = localStorage.getItem('mdmaker-active-tab');

        if (savedTabs) {
            try {
                const parsed = JSON.parse(savedTabs);
                if (Array.isArray(parsed)) {
                    const validTabs = parsed.filter(isValidTab);
                    if (validTabs.length > 0) {
                        setTabs(validTabs);
                        const activeIsValid = validTabs.some((t) => t.id === active);
                        setActiveTabId(activeIsValid && active ? active : validTabs[0].id);
                    } else {
                        throw new Error('No valid tabs found');
                    }
                } else {
                    throw new Error('Local storage tabs must be an array');
                }
            } catch (err) {
                console.warn('Local storage data corrupted. Initializing fresh tabs.');
                const initialTab = {
                    id: generateId(),
                    name: 'Untitled',
                    content: DEFAULT_TEXT,
                    scrollTop: 0,
                };
                setTabs([initialTab]);
                setActiveTabId(initialTab.id);
            }
        } else {
            const initialTab = {
                id: generateId(),
                name: 'Untitled',
                content: DEFAULT_TEXT,
                scrollTop: 0,
            };
            setTabs([initialTab]);
            setActiveTabId(initialTab.id);
        }

        const savedTheme = localStorage.getItem('inkwell-theme');
        if (savedTheme) {
            setTheme(savedTheme as 'light' | 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

    const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

    // Auto-save and process markdown
    useEffect(() => {
        if (tabs.length > 0) {
            try {
                localStorage.setItem('mdmaker-tabs', JSON.stringify(tabs));
                localStorage.setItem('mdmaker-active-tab', activeTabId);
            } catch (err) {
                console.warn('Storage quota exceeded. Unable to save tabs automatically.');
            }
        }

        if (!activeTab) return;
        const text = activeTab.content;

        const rawHtml = marked.parse(text) as string;
        const cleanHtml = DOMPurify.sanitize(rawHtml, { USE_PROFILES: { html: true } });

        setHtmlPreview(cleanHtml);

        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        setWordCount(words);
        setCharCount(text.length);
    }, [tabs, activeTabId]);

    const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const pos = target.selectionStart;
        const lines = target.value.substring(0, pos).split('\n');
        setLineInfo({ ln: lines.length, col: lines[lines.length - 1].length + 1 });
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        const scrollTop = e.target.scrollTop;
        setTabs(tabs.map((t) => (t.id === activeTabId ? { ...t, content: val, scrollTop } : t)));
        setDirtyTabs((prev) => {
            const next = new Set(prev);
            next.add(activeTabId);
            return next;
        });
    };

    // Restore scroll position when switching tabs
    useEffect(() => {
        if (editorRef.current && activeTab) {
            editorRef.current.value = activeTab.content;
            editorRef.current.scrollTop = activeTab.scrollTop;
        }
    }, [activeTabId]);

    const createTab = useCallback(() => {
        const newTab = { id: generateId(), name: 'Untitled', content: '', scrollTop: 0 };
        setTabs((prev) => [...prev, newTab]);
        setActiveTabId(newTab.id);
        // Auto-focus the editor when a new tab is created
        setTimeout(() => editorRef.current?.focus(), 0);
    }, []);

    const closeTab = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDirtyTabs((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
        });

        if (tabs.length <= 1) {
            setTabs([{ ...tabs[0], id: generateId(), content: '', name: 'Untitled' }]);
            return;
        }
        const idx = tabs.findIndex((t) => t.id === id);
        const newTabs = tabs.filter((t) => t.id !== id);
        fileHandles.current.delete(id);
        setTabs(newTabs);
        if (activeTabId === id) {
            setActiveTabId(newTabs[Math.min(idx, newTabs.length - 1)].id);
        }
    };

    const saveFile = useCallback(async () => {
        if (!activeTab) return;
        const text = activeTab.content;

        // Use File System Access API if available
        if ('showSaveFilePicker' in window) {
            try {
                let handle = fileHandles.current.get(activeTabId);
                if (!handle) {
                    const match = text.match(/^#\s+(.+)$/m);
                    let filename = 'document.md';
                    if (match) {
                        filename =
                            match[1]
                                .trim()
                                .replace(/[^a-zA-Z0-9_\- ]/g, '')
                                .replace(/\s+/g, '_')
                                .toLowerCase() + '.md';
                    }
                    handle = await (window as any).showSaveFilePicker({
                        suggestedName: filename,
                        types: [
                            {
                                description: 'Markdown Files',
                                accept: { 'text/markdown': ['.md', '.markdown'] },
                            },
                            { description: 'Text Files', accept: { 'text/plain': ['.txt'] } },
                        ],
                    });
                    fileHandles.current.set(activeTabId, handle);
                }
                const writable = await handle.createWritable();
                await writable.write(text);
                await writable.close();
                setDirtyTabs((prev) => {
                    const next = new Set(prev);
                    next.delete(activeTabId);
                    return next;
                });
                return;
            } catch (err: any) {
                if (err.name === 'AbortError') return;
                fileHandles.current.delete(activeTabId);
            }
        }

        // Fallback to export if the API fails or is unavailable
        exportFile();
    }, [activeTab, activeTabId]);

    const importFile = async () => {
        if ('showOpenFilePicker' in window) {
            try {
                const [handle] = await (window as any).showOpenFilePicker({
                    types: [
                        {
                            description: 'Markdown Files',
                            accept: { 'text/markdown': ['.md', '.markdown'] },
                        },
                        { description: 'Text Files', accept: { 'text/plain': ['.txt'] } },
                    ],
                    multiple: false,
                });
                const file = await handle.getFile();
                const text = await file.text();
                const newTab = {
                    id: generateId(),
                    name: handle.name.replace(/\.[^.]+$/, ''),
                    content: text,
                    scrollTop: 0,
                };

                fileHandles.current.set(newTab.id, handle);
                setTabs((prev) => [...prev, newTab]);
                setActiveTabId(newTab.id);
                return;
            } catch (err: any) {
                if (err.name === 'AbortError') return;
            }
        }

        // Fallback for older browsers
        fileInputRef.current?.click();
    };

    const runImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            const result = evt.target?.result as string;
            const newTab = {
                id: generateId(),
                name: file.name.replace(/\.[^.]+$/, ''),
                content: result,
                scrollTop: 0,
            };
            setTabs((prev) => [...prev, newTab]);
            setActiveTabId(newTab.id);
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    const exportFile = useCallback(() => {
        if (!activeTab) return;
        const text = activeTab.content;
        const match = text.match(/^#\s+(.+)$/m);
        let filename = 'document.md';
        if (match) {
            filename =
                match[1]
                    .trim()
                    .replace(/[^a-zA-Z0-9_\- ]/g, '')
                    .replace(/\s+/g, '_')
                    .toLowerCase() + '.md';
        }
        const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setDirtyTabs((prev) => {
            const next = new Set(prev);
            next.delete(activeTab.id);
            return next;
        });
    }, [activeTab]);

    // Resizing Handlers
    const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
        mouseDownEvent.preventDefault();
        isResizing.current = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';

        const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            if (!isResizing.current || !panelsRef.current) return;
            const rect = panelsRef.current.getBoundingClientRect();
            const fraction = (mouseMoveEvent.clientX - rect.left) / rect.width;
            setSplitFraction(Math.max(0.2, Math.min(0.8, fraction))); // clamp 20% to 80%
        };

        const handleMouseUp = () => {
            isResizing.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, []);

    // Format helpers
    const undoableInsert = (text: string) => {
        if (editorRef.current) {
            editorRef.current.focus();
            document.execCommand('insertText', false, text);
        }
    };

    const insertFormat = (before: string, after: string) => {
        if (!editorRef.current) return;
        const editor = editorRef.current;
        editor.focus();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const sel = editor.value.substring(start, end);

        // Match user's specific undoable insert logic:
        const val = editor.value;
        if (
            sel.length >= before.length + after.length &&
            sel.startsWith(before) &&
            sel.endsWith(after)
        ) {
            const replacement = sel.substring(before.length, sel.length - after.length);
            editor.setSelectionRange(start, end);
            undoableInsert(replacement);
            editor.setSelectionRange(start, start + replacement.length);
            return;
        }

        const beforeMatch = val.substring(start - before.length, start) === before;
        const afterMatch = val.substring(end, end + after.length) === after;
        if (beforeMatch && afterMatch) {
            editor.setSelectionRange(start - before.length, end + after.length);
            undoableInsert(sel);
            editor.setSelectionRange(start - before.length, start - before.length + sel.length);
            return;
        }

        const replacement = before + (sel || 'text') + after;
        editor.setSelectionRange(start, end);
        undoableInsert(replacement);

        const innerStart = start + before.length;
        const innerEnd = innerStart + (sel || 'text').length;
        editor.setSelectionRange(innerStart, innerEnd);
    };

    const insertPrefix = (prefix: string) => {
        if (!editorRef.current) return;
        const editor = editorRef.current;
        editor.focus();
        const start = editor.selectionStart;
        const lineStart = editor.value.lastIndexOf('\n', start - 1) + 1;
        editor.setSelectionRange(lineStart, lineStart);
        undoableInsert(prefix);
    };

    const insertLink = () => {
        if (!editorRef.current) return;
        const editor = editorRef.current;
        editor.focus();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const sel = editor.value.substring(start, end) || 'link text';
        editor.setSelectionRange(start, end);
        undoableInsert(`[${sel}](url)`);
    };

    // Keyboard Shortcuts
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key.toLowerCase() === 'b') {
                e.preventDefault();
                insertFormat('**', '**');
            }
            if (e.key.toLowerCase() === 'i') {
                e.preventDefault();
                insertFormat('*', '*');
            }
            if (e.key.toLowerCase() === 'k') {
                e.preventDefault();
                insertLink();
            }
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            undoableInsert('  ');
        }
    };

    // Global Window Shortcuts (Ctrl+S, Ctrl+N, Ctrl+O, Ctrl+W)
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            // Handle Tab Closing
            if (((e.ctrlKey || e.metaKey) && key === 'w') || (e.altKey && key === 'w')) {
                e.preventDefault();

                // Keep the last tab or close the current one
                if (tabs.length > 1) {
                    const idx = tabs.findIndex((t) => t.id === activeTabId);
                    const newTabs = tabs.filter((t) => t.id !== activeTabId);
                    setTabs(newTabs);
                    setActiveTabId(newTabs[Math.min(idx, newTabs.length - 1)].id);
                } else {
                    // Just clear the single tab rather than removing it completely
                    setTabs([{ id: generateId(), name: 'Untitled', content: '', scrollTop: 0 }]);
                }
                return;
            }

            // Handle alternative bindings that often conflict with browsers
            if (e.altKey && key === 'n') {
                e.preventDefault();
                createTab();
                return;
            }

            if (!(e.ctrlKey || e.metaKey)) return;

            if (key === 's') {
                e.preventDefault();
                if (e.shiftKey) {
                    exportFile();
                } else {
                    saveFile();
                }
            } else if (key === 'n') {
                e.preventDefault();
                createTab();
            } else if (key === 'o') {
                e.preventDefault();
                importFile();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [activeTabId, tabs, createTab, exportFile, saveFile, importFile]);

    const getTabName = (tab: TabData) => {
        const match = tab.content.match(/^#\s+(.+)$/m);
        if (match) return match[1].trim();
        return tab.name || 'Untitled';
    };

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        try {
            localStorage.setItem('inkwell-theme', newTheme);
        } catch (err) {}
    };

    return (
        <div
            className={`md-app-container flex flex-col h-full w-full min-w-0 min-h-0 overflow-hidden ${theme === 'dark' ? 'dark-theme-override' : ''}`}
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        >
            {/* TOOLBAR */}
            <div
                className="flex items-center justify-between px-5 py-2.5 flex-shrink-0"
                style={{
                    backgroundColor: 'var(--toolbar-bg)',
                    borderBottom: '1px solid var(--border)',
                }}
            >
                <div className="flex items-center gap-3.5">
                    <div
                        className="flex items-center gap-2 text-lg font-bold tracking-tight select-none font-['Literata'] transition-colors"
                        style={{ color: 'var(--accent)' }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 3a2.85 2.85 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        </svg>
                        Markdown Maker
                    </div>

                    <div
                        className="w-px h-5 mx-1 hidden sm:block"
                        style={{ backgroundColor: 'var(--border-strong)' }}
                    ></div>

                    <div className="hidden sm:flex gap-0.5">
                        <button
                            className="glass-btn w-8 h-8"
                            onClick={() => insertFormat('**', '**')}
                            title="Bold (Ctrl+B)"
                        >
                            <LuBold size={16} />
                        </button>
                        <button
                            className="glass-btn w-8 h-8"
                            onClick={() => insertFormat('*', '*')}
                            title="Italic (Ctrl+I)"
                        >
                            <LuItalic size={16} />
                        </button>
                        <button
                            className="glass-btn w-8 h-8"
                            onClick={() => insertFormat('~~', '~~')}
                            title="Strikethrough"
                        >
                            <LuStrikethrough size={16} />
                        </button>
                        <button
                            className="glass-btn w-8 h-8"
                            onClick={() => insertFormat('\`', '\`')}
                            title="Inline Code"
                        >
                            <LuCode size={16} />
                        </button>
                        <button
                            className="glass-btn w-8 h-8"
                            onClick={() => insertPrefix('## ')}
                            title="Heading"
                        >
                            <LuHeading2 size={16} />
                        </button>
                        <button
                            className="glass-btn w-8 h-8"
                            onClick={() => insertPrefix('> ')}
                            title="Blockquote"
                        >
                            <LuTextQuote size={16} />
                        </button>
                        <button
                            className="glass-btn w-8 h-8"
                            onClick={() => insertPrefix('- ')}
                            title="List"
                        >
                            <LuList size={16} />
                        </button>
                        <button
                            className="glass-btn w-8 h-8"
                            onClick={() => insertLink()}
                            title="Link (Ctrl+K)"
                        >
                            <LuLink size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex gap-1">
                        <label
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs cursor-pointer transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                            style={{ color: 'var(--text-secondary)' }}
                            title="Import (Ctrl+O)"
                            onClick={(e) => {
                                e.preventDefault();
                                importFile();
                            }}
                        >
                            <LuUpload size={14} /> <span>Import</span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                accept=".md,.markdown,.txt"
                                onChange={runImport}
                            />
                        </label>
                        <button
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs cursor-pointer transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                            style={{ color: 'var(--text-secondary)' }}
                            onClick={exportFile}
                            title="Export (Ctrl+S)"
                        >
                            <LuDownload size={14} /> <span>Export</span>
                        </button>
                    </div>

                    <div
                        className="flex rounded-lg p-1 gap-0.5"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                    >
                        {(['split', 'editor', 'preview'] as const).map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${view === v ? 'shadow-sm' : ''}`}
                                style={
                                    view === v
                                        ? {
                                              backgroundColor: 'var(--bg-editor)',
                                              color: 'var(--text-primary)',
                                          }
                                        : { color: 'var(--text-muted)' }
                                }
                            >
                                {v.charAt(0).toUpperCase() + v.slice(1)}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ml-1"
                        style={{
                            backgroundColor: 'var(--bg-editor)',
                            borderColor: 'var(--border)',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        {theme === 'dark' ? <LuMoon size={16} /> : <LuSun size={16} />}
                    </button>
                </div>
            </div>

            {/* TAB BAR */}
            <div
                className="flex items-end px-2 overflow-x-auto overflow-y-hidden flex-shrink-0"
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border)',
                }}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`group flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-colors min-w-0 max-w-[180px] ${activeTabId === tab.id ? 'font-semibold' : ''}`}
                        style={{
                            color:
                                activeTabId === tab.id
                                    ? 'var(--text-primary)'
                                    : 'var(--text-muted)',
                            backgroundColor:
                                activeTabId === tab.id ? 'var(--bg-editor)' : 'transparent',
                            borderColor: activeTabId === tab.id ? 'var(--accent)' : 'transparent',
                        }}
                    >
                        <span className="truncate pointer-events-none">{getTabName(tab)}</span>
                        <div
                            className={`w-4 h-4 flex items-center justify-center rounded transition-opacity hover:!opacity-100 hover:!bg-[var(--accent-soft)] hover:!text-[var(--accent)] ${dirtyTabs.has(tab.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                            onClick={(e) => closeTab(e, tab.id)}
                            title={dirtyTabs.has(tab.id) ? 'Unsaved changes' : ''}
                        >
                            {dirtyTabs.has(tab.id) ? (
                                <div className="text-[10px] leading-none mb-0.5">●</div>
                            ) : (
                                <LuX size={12} />
                            )}
                        </div>
                    </button>
                ))}
                <button
                    onClick={createTab}
                    className="flex items-center justify-center w-7 h-7 mx-1 rounded-md text-lg transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-muted)' }}
                    title="New Tab (Ctrl+N)"
                >
                    +
                </button>
            </div>

            {/* PANELS */}
            <div ref={panelsRef} className="flex flex-1 min-h-0 overflow-hidden relative w-full">
                {view !== 'preview' && (
                    <div
                        className="flex flex-col min-w-0 min-h-0 h-full overflow-hidden"
                        style={{
                            flex: view === 'split' ? `0 0 ${splitFraction * 100}%` : '1 1 auto',
                            backgroundColor: 'var(--bg-editor)',
                        }}
                    >
                        <textarea
                            ref={editorRef}
                            value={activeTab?.content || ''}
                            onChange={handleContentChange}
                            onSelect={handleSelect}
                            onKeyUp={handleSelect}
                            onClick={handleSelect}
                            onKeyDown={handleKeyDown}
                            spellCheck={false}
                            placeholder="Start writing markdown here..."
                            className="md-editor w-full h-full p-6 outline-none resize-none overflow-auto"
                        />
                    </div>
                )}

                {view === 'split' && (
                    <div
                        onMouseDown={startResizing}
                        className="w-[5px] shrink-0 cursor-col-resize transition-colors"
                        style={{ backgroundColor: 'var(--border)' }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--accent)')
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--border)')
                        }
                    />
                )}

                {view !== 'editor' && (
                    <div
                        className="flex flex-1 flex-col overflow-auto h-full min-w-0 min-h-0 md-preview-wrap pt-4"
                        style={{ backgroundColor: 'var(--bg-preview)' }}
                    >
                        <div
                            className="md-preview"
                            dangerouslySetInnerHTML={{ __html: htmlPreview }}
                        ></div>
                    </div>
                )}
            </div>

            {/* STATUS BAR */}
            <div
                className="flex flex-shrink-0 items-center justify-between px-5 py-1.5 text-[11px] border-t"
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                }}
            >
                <span className="font-['JetBrains_Mono'] tabular-nums">
                    Ln {lineInfo.ln}, Col {lineInfo.col}
                </span>
                <span className="tabular-nums">{wordCount} words</span>
                <span className="tabular-nums">{charCount} chars</span>
                <span>Markdown</span>
            </div>
        </div>
    );
}
