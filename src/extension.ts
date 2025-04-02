import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

function findDirectoriesNamed(dir: string, targetDirName: string): string[] {
	const results: string[] = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name === targetDirName) {
				results.push(fullPath);
			}
			results.push(...findDirectoriesNamed(fullPath, targetDirName));
		}
	}
	return results;
}

function findFileRecursive(dir: string, targetRelativePath: string): string | null {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			const found = findFileRecursive(fullPath, targetRelativePath);
			if (found) return found;
		} else if (entry.isFile() && fullPath.endsWith(targetRelativePath)) {
			return fullPath;
		}
	}
	return null;
}

function getSelectedSnakeCase(): string | null {
	const editor = vscode.window.activeTextEditor;
	if (!editor) return null;

	const selection = editor.selection;
	const text = editor.document.getText(selection) ||
		editor.document.getText(editor.document.getWordRangeAtPosition(selection.active));

	return text?.trim() || null;
}

function snakeCaseToPath(snakeCase: string): string {
	return snakeCase
		.split('_')
		.map(s => s.charAt(0).toUpperCase() + s.slice(1))
		.join('/') + '.php';
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Your extension "dataformat-finder" is now active!');

	const disposable = vscode.commands.registerCommand('dataformat-finder.findFile', async () => {
		const snakeCase = getSelectedSnakeCase();
		if (!snakeCase) {
			vscode.window.showErrorMessage('No table name selected.');
			return;
		}

		const relativePath = snakeCaseToPath(snakeCase);

		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			vscode.window.showErrorMessage('No workspace is open.');
			return;
		}

		// ワークスペース全体から DataFormat フォルダを探す
		const workspaceRoot = workspaceFolders[0].uri.fsPath;
		const dataFormatDirs = findDirectoriesNamed(workspaceRoot, 'DataFormat');

		for (const dir of dataFormatDirs) {
			const foundPath = findFileRecursive(dir, relativePath);
			if (foundPath) {
				const doc = await vscode.workspace.openTextDocument(foundPath);
				vscode.window.showTextDocument(doc);
				return;
			}
		}

		vscode.window.showErrorMessage(`File not found in any DataFormat directory: ${relativePath}`);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
