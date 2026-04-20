var Module = typeof Module !== 'undefined' ? Module : {};

// 1. Defeat the Blob Worker 404 Bug permanently!
Module.locateFile = function(path, prefix) {
    if (prefix.startsWith('blob:')) {
        // Force the Blob worker to load files from your actual server folder
        return 'http://localhost:3000/engine/test/' + path;
    }
    return prefix + path;
};

// 2. Output Routing
Module.print = function(text) { postMessage(text); };
Module.printErr = function(text) { console.warn("Engine:", text); };

// 3. Command Inbox
self.cmd_queue = [];
self.onmessage = function(e) {
    if (typeof e.data === 'string') {
        self.cmd_queue.push(e.data);
    }
};
