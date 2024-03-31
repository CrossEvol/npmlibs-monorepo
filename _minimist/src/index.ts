import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
console.log(process.argv0)
console.log(process.argv[1])
console.log(argv)
