var path = require("path");
var nomnom = require("nomnom");
var FileReader = require("n-readlines");
var fs = require("fs");

var fsutil = require("./file-system-util");

// Parses the command line arguments into an object
var processArgs = function (argv, cwd) {

    var args = nomnom
        .script("jscombo <path>...")
        .option("root", {
            abbr: "r",
            help: "The application root directory"
        })
        .option("help", {
            abbr: "h",
            flag: true,
            help: "Show help"
        })
        .parse();

    var sourcePath = cwd;

    if (args._.length >= 1) {
        sourcePath = path.resolve(cwd, args._[0]);
    }

    args.sourcePath = sourcePath;

    if (!args.root) {
        args.root = args.sourcePath;
    }

    return args;
};

var getRootRelativePath = function (root, absolutePath) {
    return "/" + path.relative(root, absolutePath).replace(/\\/g, "/");
};

var processFile = function (absolutePath, options) {

    var fileData = fs.readFileSync(absolutePath, { flag: "r" }).toString();
    var data = JSON.parse(fileData);
};

exports.main = function (stdout, stderr, argv, cwd) {

    var options = processArgs(argv, cwd, stderr);

    processFile(options.sourcePath);

    return 0;
};