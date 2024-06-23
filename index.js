#! /usr/bin/env node
import inquirer from "inquirer";
console.log("-------------------------------------------------------");
console.log("\t STUDENT MANAGEMENT SYSTEM \t");
console.log("-------------------------------------------------------\n");
class Student {
    static counter = 10000;
    name;
    id;
    balance;
    enrolledCourses;
    constructor(name) {
        this.name = name;
        this.id = Student.counter++;
        this.balance = 1000;
        this.enrolledCourses = [];
    }
    enrollStudent(courseName) {
        this.enrolledCourses.push(courseName);
        console.log(`${this.name} enrolled in ${courseName} course successfully...`);
    }
    viewStudentBalance() {
        console.log(`\n Balance for ${this.name} : $ ${this.balance} \n`);
        return this.balance;
    }
    payStudentFees(fees) {
        if (this.balance >= fees) {
            this.balance -= fees;
            console.log(`\n $ ${fees} has been paid for ${this.name}`);
            console.log("-------------------------------------------------------");
            console.log(`Remaining Balance : $ ${this.balance} \n`);
        }
        else {
            console.log("\nYou don't have sufficient balance to pay fees!");
            console.log("-------------------------------------------------------");
        }
    }
    showStudentStatus() {
        console.log(`\nID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Balance : $${this.balance}`);
        console.log(`Enrolled Courses : ${this.enrolledCourses}`);
        console.log("-------------------------------------------------------");
    }
}
class StudentManager {
    // Students array
    students;
    constructor() {
        this.students = [];
    }
    // Add student
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`\n${student.name} added successfully, Student ID : ${student.id}\n`);
    }
    // Enroll Student in course
    enrollStudent(id, courseName) {
        let student = this.findStudent(id);
        if (student) {
            student.enrollStudent(courseName);
        }
        else {
            console.log("Student not found! please enter a valid student ID!");
        }
    }
    viewStudentBalance(id) {
        let student = this.findStudent(id);
        if (student) {
            student.viewStudentBalance();
        }
        else {
            console.log("Student not found! please enter a valid student ID!");
        }
    }
    payStudentFees(id, fees) {
        let student = this.findStudent(id);
        if (student) {
            student.payStudentFees(fees);
        }
        else {
            console.log("Student not found! please enter a valid student ID!");
        }
    }
    showStudentStatus(id) {
        let student = this.findStudent(id);
        if (student) {
            student.showStudentStatus();
        }
        else {
            console.log("Student not found! please enter a valid student ID!");
        }
    }
    findStudent(id) {
        return this.students.find((student) => student.id === id);
    }
}
// Main function from where application is started
async function main() {
    // initialize student manager
    let studentManager = new StudentManager();
    while (true) {
        let answers = await inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: "choose an option : ",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Student Status",
                    "Exit",
                ],
            },
        ]);
        if (answers.option === "Exit") {
            console.log("-------------------------------------------------------");
            console.log("\t\t\t EXIT \t\t");
            console.log("-------------------------------------------------------");
            process.exit();
        }
        else if (answers.option === "Add Student") {
            console.log("-------------------------------------------------------");
            console.log("\t\t\t ADD STUDENT \t\t");
            console.log("-------------------------------------------------------");
            let answer = await inquirer.prompt([
                {
                    type: "string",
                    name: "name",
                    message: "Enter student name : ",
                },
            ]);
            // add student by student manager
            studentManager.addStudent(answer.name);
        }
        else if (answers.option === "Enroll Student") {
            console.log("-------------------------------------------------------");
            console.log("\t\t\t ENROLL STUDENT \t\t");
            console.log("-------------------------------------------------------");
            let answer = await inquirer.prompt([
                {
                    type: "number",
                    name: "id",
                    message: "Enter student ID : ",
                },
                {
                    type: "string",
                    name: "courseName",
                    message: "Enter course name : ",
                },
            ]);
            // enroll student in course
            studentManager.enrollStudent(answer.id, answer.courseName);
        }
        else if (answers.option === "View Student Balance") {
            console.log("-------------------------------------------------------");
            console.log("\t\t\t VIEW STUDENT BALANCE \t\t");
            console.log("-------------------------------------------------------");
            let answer = await inquirer.prompt([
                {
                    type: "number",
                    name: "id",
                    message: "Enter student ID : ",
                },
            ]);
            // show student balance by student manager
            studentManager.viewStudentBalance(answer.id);
        }
        else if (answers.option === "Pay Student Fees") {
            console.log("-------------------------------------------------------");
            console.log("\t\t\t PAY STUDENT FEES \t\t");
            console.log("-------------------------------------------------------");
            let answer = await inquirer.prompt([
                {
                    type: "number",
                    name: "id",
                    message: "Enter student ID : ",
                },
                {
                    type: "number",
                    name: "fees",
                    message: "Enter Amount to pay : $ ",
                },
            ]);
            studentManager.payStudentFees(answer.id, answer.fees);
        }
        else if (answers.option === "Show Student Status") {
            console.log("-------------------------------------------------------");
            console.log("\t\t\t SHOW STUDENT STATUS \t\t");
            console.log("-------------------------------------------------------");
            let answer = await inquirer.prompt([
                {
                    type: "number",
                    name: "id",
                    message: "Enter student ID : ",
                },
            ]);
            studentManager.showStudentStatus(answer.id);
        }
    }
}
main();
