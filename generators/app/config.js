module.exports = {
    dirsToCreate: ['app/images', 'app/fonts'],
    filesToCopy: [
      {
        input: 'gitignore',
        output: '.gitignore'
      },
      {
        input: 'vite.config.js',
        output: 'vite.config.js'
      },
    ],
    filesToRender: [
      {
        input: '_package.json',
        output: 'package.json'
      },
      {
        input: 'README.md',
        output: 'README.md'
      },
      {
        input: 'index.html',
        output: 'src/index.html'
      },
      {
        input: 'index.html',
        output: 'src/style.css'
      },
      {
        input: 'index.html',
        output: 'src/App.jsx'
      }
    ]
  };