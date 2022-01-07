import type { TodoList } from "src/types/todo.types";

const loadFile: () => Promise<string> = () => new Promise((resolve, reject) => {
    const fileEl: HTMLInputElement = document.createElement("input");
    fileEl.type = "file";
    fileEl.accept="application/json";
    fileEl.click();
    fileEl.addEventListener("change", (e) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const text: string = reader.result as string;
            resolve(text);
        });
        reader.addEventListener("error", () => {
            reject();
        });
        const file: File = (e.target as HTMLInputElement).files[0];
        if (file.type === "application/json") {
            reader.readAsText(file, "utf-8");
        }
    });
});

const saveFile: (todos: TodoList[]) => void = (todos: TodoList[]) => {
    const element = document.createElement('a');
    const now = new Date();
    const filename = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
    element.setAttribute('href', `data:text/plain;charset=utf-8,${JSON.stringify(todos, null, 2)}`);
    element.setAttribute('download', `DoToo${filename}.json`);
    element.click();
};

export {
    loadFile,
    saveFile,
};