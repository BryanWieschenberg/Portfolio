import tailwindScrollbar from 'tailwind-scrollbar';

export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                varela: ['Varela Round', 'sans-serif'],
            },
            backgroundImage: {
                '345gradient': 'linear-gradient(345deg, #24bdd4, #c4f9ff)',
            },
        },
    },
    plugins: [tailwindScrollbar],
};
