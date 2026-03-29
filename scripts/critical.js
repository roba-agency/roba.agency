import {generate} from 'critical';

const pages = ["index.html", "get-started.html"]

for (const page of pages) {
    console.log(`inlining styles for ${page}`)
    generate({
        inline: true,
        base: 'dist/',
        src: page,
        target: page,
        width: 1300,
        height: 900,
    });
}
