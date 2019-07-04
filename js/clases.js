class Validation{
    validateInput(taskName,check){
       
        if (taskName==="" || taskName.length >100) {
            
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Please Complete task name to continue!',
                
              })
              event.preventDefault();
              return false;
          }else if(!check){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Please select a status for the task!',
                
              })
              event.preventDefault();
              return false;
          }
          else{
              return true;
          }
    }
    
    
    }

class UI{
    
initializer(){ 
    let id;
        // methods for getting task in localStorage.
    
 if (localStorage.getItem('tasks')===null) {
        
		id=0;
		document.getElementById('idinput').value=id;
    }
    else {
        if(localStorage.getItem('tasks').length==2){
            localStorage.clear();
            location.reload();
        }
            let drawtable = JSON.parse(localStorage.getItem('tasks'));
            id=drawtable[drawtable.length-1].id;
            document.getElementById('idinput').value=id;
            $("#showtable td").remove(); 
            for (var i = 0; i < drawtable.length; i++) {
                showtable.innerHTML += "<tr><td>" + drawtable[i].id + "</td><td>" + drawtable[i].name + "</td><td>"+ drawtable[i].assignee + "</td><td>"+ drawtable[i].status + "</td><td>"+ drawtable[i].creationDate + "</td><td>"+ "<button type='button' class='btn btn-danger' id='delete-element'  value='" + drawtable[i].id +"'>Delete</button><button type='button' class='btn btn-success' id=" + drawtable[i].id +"  data-toggle='modal' data-target='#exampleModal'>Edit</button></td></tr>"; //draw the new task
        
            }
            
    }
        
		
   } 
   
	


    
getTask(){ //Create method to create a task
    
    document.querySelector('form').addEventListener('submit',function(e){
        e.preventDefault();
let name=document.getElementById("Name").value; 
let validatecheck=document.querySelector('.form-check-input:checked');
let id=document.getElementById('idinput').value;
        const validation= new Validation();

            if(validation.validateInput(name,validatecheck)==true){
                let assigneeValue = assignee.options[assignee.selectedIndex].value;
                let checkedValue = document.querySelector('.form-check-input:checked').value;
                let creationdate= new Date();
                id=id+1;
                document.getElementById('idinput').value=id;
                const task= new Task(id,name,assigneeValue,checkedValue,creationdate);
                const storage= new Storage();
                storage.saveStorage(task);
                const draw = new TaskList();
                draw.drawTask(task,1) ;
            }
    });

}

deleteitem(){ //Create method to delete a task.
  
    let flag = document.querySelector('.table');

    flag.addEventListener('click', function(e){
        if(e.target && e.target.nodeName == "BUTTON" && e.target.value>0) {
        
        let index=e.target.value;
        const draw = new TaskList();
        draw.DeleteElement(index);
        const uikit= new UI();
        uikit.initializer();
    }

    }); 

}


getFilterName(){ //method to search tasks.
    let filterInput = document.getElementById('Search');
   let input = document.getElementById("Search").value;
    filterInput.addEventListener('keyup', function(e){
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("Search");
        filter = input.value.toUpperCase(); 
        table = document.getElementById("showtable");
        tr = table.getElementsByTagName("tr");

        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                } else {
                tr[i].style.display = "none";
                }
            } 
            }
    });


}
 sortByDates(){ //method to sort tasks.
    
    
    let dateInput = document.getElementById('sortDate');
    dateInput.addEventListener('click', function(e){
        
            const sto= new Storage();
    let tasks=sto.getstoragearray();
    let filterByDate=tasks.sort(function (a, b) {
		let dateA = new Date(a.creationDate)
		let dateB = new Date(b.creationDate);
		if(dateA > dateB) return -1;
		if(dateA < dateB) return 1;
		return  0;
	});
    $("#showtable td").remove();
    const taskslist= new TaskList();
    taskslist.drawMultipleTask(filterByDate,filterByDate.length);
        
	
    });
   
}

getOrderByStatus(){
    const sto= new Storage();
    let tasks=sto.getstoragearray();
    let filterState = document.getElementById('inlineFormCustomSelect');
    let compare=filterState.options[filterState.selectedIndex].value;
   
    filterState.addEventListener('change', function(){
        filterState = document.getElementById('inlineFormCustomSelect');
        compare=filterState.options[filterState.selectedIndex].value;
        
        const result = tasks.filter(function(task){
            if(task.status==compare){
                
                return tasks;
            }
        });
        $("#showtable td").remove();
        const taskslist= new TaskList();
        taskslist.drawMultipleTask(result,result.length);
        
    });

}

validatecheckbox(){

   let flag = document.querySelector('.form-check-input');

    flag.addEventListener('click', function(e){

        if(e.target.checked==true)
        {
            document.getElementById('Done').disabled = true;
            document.getElementById('Done').checked = false;
            
            
        }else if(e.target.checked==false){
            document.getElementById('Done').disabled = false;
        }
    });

}


getEditTask(){ 

    let flag = document.querySelector('.table');

    flag.addEventListener('click', function(e){
        if(e.target && e.target.nodeName == "BUTTON") {
        let index=e.target.id;
        const tasklist= new TaskList();
        let tasktoedit=  tasklist.editTaskSelected(index);
        let name= document.getElementById("idinput2").value=tasktoedit[0].id;  
        
        let name2=  document.getElementById("Name2").value=tasktoedit[0].name;
        
        document.getElementById("persontodotask").innerHTML=`task: ${tasktoedit[0].name} --Asigned to: ${tasktoedit[0].assignee}--Actual Task Status: ${tasktoedit[0].status}`;
       

        let savechanges = document.getElementById('savechanges');
        savechanges.addEventListener('click', function(e){
           
            let assigneeValue = assignee2.options[assignee2.selectedIndex].value;
            let creationdate= new Date();
            name2=  document.getElementById("Name2").value;
            
        if(document.getElementById("change").value=="change" && document.getElementById('change').checked==true)
            { 
               if(tasktoedit[0].status=='Done'){
                tasktoedit[0].status='Pending';
               
               }else{
                tasktoedit[0].status='Done'
                
               }
            }
            
        if(assigneeValue=="Default"){
            
            assigneeValue=tasktoedit[0].assignee;
        }
                console.log(tasktoedit[0].status)
            const tasklist= new TaskList();
            tasklist.UpdateTask(index,name2,assigneeValue,tasktoedit[0].status,creationdate);
        });
                    
        }})

}

}


class TaskList{

drawTask(tasks,length){ //method to add a task in the table.
 
    for (var i = 0; i < length; i++) {
        showtable.innerHTML += `<tr><td>${tasks.id}</td><td>${tasks.name}</td><td>${tasks.assignee}</td><td>${tasks.status}</td><td>${tasks.creationDate}</td><td><button type='button' class='btn btn-danger' id='delete-element${tasks.id}' value='${tasks.id}' >Delete</button><button type='button' class='btn btn-success' id='${tasks.id}'  data-toggle="modal" data-target="#exampleModal">Edit</button></td></tr>`; //draw the new task
                                                    }
  
  }

drawMultipleTask(tasks,length){
    if(length===0){
        Swal.fire(
            'no match found!',
            'we gonna show all the data btw')
            const uikit=new UI();
            uikit.initializer();
    }else{
        
    for (var i = 0; i < length; i++) {
        showtable.innerHTML += `<tr><td>${tasks[i].id}</td><td>${tasks[i].name}</td><td>${tasks[i].assignee}</td><td>${tasks[i].status}</td><td>${tasks[i].creationDate}</td><td><button type='button' class='btn btn-danger' id='delete-element${tasks[i].id}' value='${tasks[i].id}' >Delete</button><button type='button' class='btn btn-success' id='${tasks.id}'  data-toggle="modal" data-target="#exampleModal">Edit</button></td></tr>`; //draw the new task
                                                    }
                                                }
}
   

DeleteElement(idtodelete){ // methods for deleting task in localStorage.


    const sto= new Storage();
    let tasks=sto.getstoragearray();
    const result = tasks.filter(function(task){
      if(task.id!=idtodelete){
          
          return tasks;
      }
    
      event.preventDefault();
  });  
  Swal.fire(
    'Item Deleted!',
    'success'
  )
  localStorage.setItem('tasks',JSON.stringify(result));    
}

editTaskSelected(idtoedit){

    const sto= new Storage();
    let tasks=sto.getstoragearray();
    const result = tasks.filter(function(task){
        if(task.id==idtoedit){
           
            return tasks;
        }
      
        event.preventDefault();
    }); 
    return result;

}

UpdateTask(index,name,assigneeValue,status,creationdate){
    const sto= new Storage();
    let tasks=sto.getstoragearray();
    debugger;
    tasks.map(function(dato){
        if(dato.id == index){
          dato.name = name;
          dato.assignee = assigneeValue;
          dato.status = status;
          dato.creationDate = creationdate;  

        }
        return dato;
    
    
})

console.log(tasks); 

const storage= new Storage();
storage.updateStorage(tasks); 


}


}


class Task{


    constructor(id,name,assigneeValue,checkedValue,creationdate){
            
        const task={

            id: id,
            name: name,
            assignee: assigneeValue,
            status: checkedValue,
            creationDate: creationdate
            
            
        } 
       return task;
    }

}

class Storage{

    saveStorage(tasks){
      
        let newTasks
        if (localStorage.getItem('tasks')===null) {
            newTasks=[];
        }else{
            newTasks=JSON.parse(localStorage.getItem('tasks'));
        }
        newTasks.push(tasks); //save the new task
        localStorage.setItem('tasks',JSON.stringify(newTasks));
        
        Swal.fire(
            'added task!',
            'New Task in local storage!',
            'success'
          )
        event.preventDefault();
    }


    updateStorage(result){
        localStorage.setItem('tasks',JSON.stringify(result));
        const uikit= new UI();
        uikit.initializer();
    }


    getstorage(){ //methods for getting task in localStorage
        let tasks=JSON.parse(localStorage.getItem('tasks'));
        var tasksarray = JSON.stringify(tasks)
        return tasksarray;
        
    }
    getstoragearray(){
        let tasks=JSON.parse(localStorage.getItem('tasks'));
        return tasks;
    }
}