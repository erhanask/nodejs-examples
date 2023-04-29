class fsController {

    constructor(fileName) {
        this.fs = require('fs');
        this.fileName = fileName;
    }

    writeFile(data) {
        this.fs.writeFile(this.fileName, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Created!');
            }
        });
    }

    readFile() {
        this.fs.readFile(this.fileName, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
    }

    updateFile(data) {
        this.fs.appendFile(this.fileName, data, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Updated!');
            }
        });
    }

    deleteFile() {
        this.fs.unlink(this.fileName, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Deleted!');
            }
        });
    }

}

const fsContent = new fsController('employees.json');

//example usage
fsContent.writeFile('{"name": "Employee 1 Name", "salary": 2000}');
fsContent.readFile();