"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.addVitestGenerator = void 0;
var devkit_1 = require("@nrwl/devkit");
var versions_1 = require("../../utils/versions");
function addVitestGenerator(tree, options) {
    return __awaiter(this, void 0, void 0, function () {
        var projectConfiguration;
        return __generator(this, function (_a) {
            projectConfiguration = (0, devkit_1.readProjectConfiguration)(tree, options.projectName);
            (0, devkit_1.generateFiles)(tree, (0, devkit_1.joinPathFragments)(__dirname, 'files'), projectConfiguration.root, options);
            updateTestTarget(tree, projectConfiguration, options.projectName);
            // TODO(caleb) if convert then remove jest files
            (0, devkit_1.addDependenciesToPackageJson)(tree, {}, { vite: versions_1.viteVersion, vitest: versions_1.vitestVersion, '@vitest/ui': versions_1.vitestUiVersion });
            return [2 /*return*/, (0, devkit_1.installPackagesTask)(tree)];
        });
    });
}
exports.addVitestGenerator = addVitestGenerator;
function updateTestTarget(tree, projectConfiguration, projectName, projectTargets) {
    if (projectTargets === void 0) { projectTargets = ["test"]; }
    for (var _i = 0, projectTargets_1 = projectTargets; _i < projectTargets_1.length; _i++) {
        var target = projectTargets_1[_i];
        var targetConfiguration = projectConfiguration.targets[target];
        console.log(JSON.stringify({ targetConfiguration: targetConfiguration }, null, 2));
        if (!targetConfiguration) {
            projectConfiguration.targets[target] = {
                executor: "./packages/vitest:test",
                options: {
                    vitestConfig: "./" + projectConfiguration.root + "/vitest.config.ts",
                    passWithNoTests: true
                }
            };
            continue;
        }
        if (targetConfiguration.executor !== '@nrwl/jest:test')
            continue;
        targetConfiguration.executor = './packages/vitest:test'; // TODO(caleb): @nrwl/vitest:test
        targetConfiguration.options = {
            vitestConfig: "./" + projectConfiguration.root + "/vitest.config.ts",
            passWithNoTests: true
        };
    }
    (0, devkit_1.updateProjectConfiguration)(tree, projectName, projectConfiguration);
}
exports["default"] = addVitestGenerator;
