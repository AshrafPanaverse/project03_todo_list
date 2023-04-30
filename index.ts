#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

let myToDoList=[
    "Read a book",
    "Organize Office",
    "Buy eggs",
    "Pay Bills"
];


let showList=async ()=>{
    const listTitle = chalkAnimation.karaoke(
        chalk.green.bold(
        `
                        \n\n\n\n\n<- My To Do List ->`
        )
    );
    listTitle.render();
    listTitle.stop();

   await myToDoList.forEach((item,index)=>{
        console.log((index+1)+'. '+item)
    })

    console.log('\n')
    await operationControl();
}



let addToList=async ()=>{
    let  newItem = await inquirer.prompt([
        {
            name:"task",
            message:"Enter Task"
        }
    ]);
    
    myToDoList.push(newItem.task)
    console.log(chalk.green('New Task Added To MyToDoList successfully!'))
    console.log('\n')
    await operationControl();
}


let removeFromList=async ()=>{
    let  item = await inquirer.prompt([
        {
            name: "item",
            type: 'list',
            choices: myToDoList,
            message: chalk.hex('#FFA500').bold(`\n\nPlease Select and Press Enter to Remove.`)
        }
    ]);
    
    let index = myToDoList.indexOf(item.item);
    //now remove this item from MyTodo List
    myToDoList.splice(index,1);
    console.log(chalk.green(`"${item.item}"  Removed From MyToDo List.`))
    console.log('\n')
    await operationControl();
}



let operations = async () => {
    let transaction = await inquirer.prompt([
        {
            name: "type",
            type: 'list',
            choices: ["Show List", "Add To List", "Remove From List", chalk.red("Exit")],
            message: chalk.hex('#FFA500').bold(`Please Select Your Option`)
        }
    ]);

    switch (transaction.type) {
        case "Show List": {
            await showList();
            break;
        }
        case "Add To List": {
           await addToList();
            break;
        }
        case "Remove From List": {
            await removeFromList();
            break;
        }
        case chalk.red("Exit"): {
            console.log('Exited')
            break;
        }
        default: {
            //statements; 
            break;
        }
    }
}

let operationControl= async() =>{
    let transaction = await inquirer.prompt([
        {
            name: "type",
            type: 'list',
            choices: ["Continue", chalk.red("Exit")],
            message: chalk.hex('#FFA500').bold(`-----------`)
        }
    ]);

    switch (transaction.type) {
        case "Continue": {
            await operations();
            break;
        }
        case chalk.red("Exit"): {
            console.log('Exited')
            break;
        }
        default: {
            //statements; 
            break;
        }
}
}


const toDoList=()=>{
    const appTitle = chalkAnimation.karaoke(
        chalk.blue.bold(
        `
                        My To Do List \n       
        `
        )
    );
    appTitle.render();
    appTitle.stop();
    operations();    
}

toDoList();

