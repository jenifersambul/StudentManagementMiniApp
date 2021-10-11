    let studenttabledata = document.getElementById("studenttabledata_body");
    let formsearchstudent = document.getElementById("formsearchstudent");

    function showaddstudentform_button() {
        let button = document.getElementById("add_student_button");

        if(button.innerText == "Show Form Add New Student") {
            button.innerText = "Hide Form Add New Student";
        } else if(button.innerText == "Hide Form Add New Student") {
            button.innerText = "Show Form Add New Student";
        }
    }

    function formstudentfaculty_onchange() {
        let formstudentfaculty_list = document.getElementById("formstudent_faculty");
        let formstudentprogramofstudy_list = document.getElementById("formstudent_programofstudy");

        let selected_faculty = formstudentfaculty_list.options[formstudentfaculty_list.selectedIndex].text;

        let data_programOfStudy = [
            {
                "option" : "Pascasarjana",
                "list" : ["Magister Manajemen", "Magiser Teologi"]
            },
            {
                "option" : "Fakultas Filsafat",
                "list" : ["Ilmu Filsafat"]
            },
            {
                "option" : "Fakultas Keguruan dan Ilmu Pendidikan",
                "list" : ["Pendidikan Agama", "Pendidikan Bahasa Inggris","Pendidikan Ekonomi", "Pendidikan Luar Sekolah"]
            },
            {
                "option" : "Fakultas Ekonomi dan Bisnis",
                "list" : ["Akuntansi", "Manajemen"]
            },
            {
                "option" : "Fakultas Pertanian",
                "list" : ["Agroteknologi"]
            },
            {
                "option" : "Fakultas Ilmu Komputer",
                "list" : ["Informatika", "Sistem Informasi"]
            },
            {
                "option" : "Fakultas Keperawatan",
                "list" : ["Keperawatan", "Profesi Ners"]
            },
            {
                "option" : "Akademi Sekretari Manajemen Indonesia Klabat",
                "list" : ["Sekretari (D3)"]
            }
        ];

        // Menghapus child
        while(formstudentprogramofstudy_list.children.length > 0) {
            formstudentprogramofstudy_list.removeChild(formstudentprogramofstudy_list.children[0]);
        }

        for(let i=0; i<data_programOfStudy.length; i++) {
            if(selected_faculty == data_programOfStudy[i].option) {
                for(let j=0; j<data_programOfStudy[i].list.length; j++) {
                    formstudentprogramofstudy_list.appendChild(createListOption(i, data_programOfStudy[i].list[j]));
                }
            }
        }
    }


    function createListOption(value, innerHtml) {
        let newOption = document.createElement("option");

        newOption.value = value;
        newOption.innerHTML = innerHtml;

        return newOption;
    }

    function add_student() {
        let NIM = document.getElementById("formstudent_id").value;

        let fullName = document.getElementById("formstudent_name").value;
        
        let gender = "";
        if(document.getElementById("genderRadio1").checked) {
            gender = "Male";
        } else if (document.getElementById("genderRadio2").checked)
        {
            gender = "Female";
        }

        let faculty = document.getElementById("formstudent_faculty").value;

        let programOfStudy = document.getElementById("formstudent_programofstudy");
        programOfStudy = programOfStudy.options[programOfStudy.selectedIndex].text;

        student_data.push({
            "NIM" : NIM,
            "fullName" : fullName,
            "gender" : gender,
            "faculty" : faculty,
            "programOfStudy" : programOfStudy
        });

        refresh_studenttabledata();
        document.getElementById("formstudent_id").value = "";
        document.getElementById("formstudent_name").value = "";
        document.getElementById("formstudent_faculty").selectedIndex = 0;
    {
        let formstudent_programofstudy = document.getElementById("formstudent_programofstudy");
        formstudent_programofstudy.textContent = ''; 
        formstudent_programofstudy.appendChild((() => {let x = document.createElement("option"); x.innerText = "--- SELECT PROGRAM OF STUDY ---"; return x;})());
        formstudent_programofstudy.selectedIndex = 0;
    }
    }
    
    function refresh_studenttabledata() {
        // Menghapus table tiap kali di-refresh
        while(studenttabledata.children.length > 0) {
            studenttabledata.removeChild(studenttabledata.children[0]);
        }

        for(let i=0; i<student_data.length; i++) {
            let row = studenttabledata.insertRow();
            
            let NIM = row.insertCell(0);
            NIM.innerHTML = student_data[i].NIM;

            let fullName = row.insertCell(1);
            fullName.innerHTML = student_data[i].fullName;

            let gender = row.insertCell(2);
            gender.innerHTML = student_data[i].gender;

            let faculty = row.insertCell(3);
            faculty.innerHTML = student_data[i].faculty;

            let programOfStudy = row.insertCell(4);
            programOfStudy.innerHTML = student_data[i].programOfStudy;

            let removeButton_cell = row.insertCell(5);
            
            let removeButton = document.createElement("button");
            removeButton.classList.add("btn-danger");
            removeButton.innerHTML = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person-x-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z'/></svg>";
            removeButton.addEventListener('click', (e) => {
                student_data.splice(i, 1);
                refresh_studenttabledata();
            })

            removeButton_cell.appendChild(removeButton);
        }
    }

    let student_data = [
        {
            "NIM" : "105011810074",
            "fullName" : "Jenifer Sambul",
            "gender" : "Female",
            "faculty" : "Fakultas Ilmu Komputer",
            "programOfStudy" : "Sistem Informasi"
        },
        {
            "NIM" : "105011810081",
            "fullName" : "Fernando Piay",
            "gender" : "Male",
            "faculty" : "Fakultas Ilmu Komputer",
            "programOfStudy" : "Informatika"
        },
        {
            "NIM" : "105011810022",
            "fullName" : "Putu Wiratama",
            "gender" : "Male",
            "faculty" : "Fakultas Ilmu Komputer",
            "programOfStudy" : "Sistem Informasi"
        },
    ]

    function search_student() {
        while(studenttabledata.children.length > 0) {
            studenttabledata.removeChild(studenttabledata.children[0]);
        }

        for(let i=0; i<student_data.length; i++) {
            if(student_data[i].fullName.includes(formsearchstudent.value))
            {
                let row = studenttabledata.insertRow();
                
                let NIM = row.insertCell(0);
                NIM.innerHTML = student_data[i].NIM;

                let fullName = row.insertCell(1);
                fullName.innerHTML = student_data[i].fullName;

                let gender = row.insertCell(2);
                gender.innerHTML = student_data[i].gender;

                let faculty = row.insertCell(3);
                faculty.innerHTML = student_data[i].faculty;

                let programOfStudy = row.insertCell(4);
                programOfStudy.innerHTML = student_data[i].programOfStudy;

                let removeButton_cell = row.insertCell(5);
                
                let removeButton = document.createElement("button");
                removeButton.classList.add("btn-danger");
                removeButton.innerHTML = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person-x-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z'/></svg>";
                removeButton.addEventListener('click', (e) => {
                    student_data.splice(i, 1);
                    refresh_studenttabledata();
                })

                removeButton_cell.appendChild(removeButton);
            }
        }
    }

    function searchby_Faculty() {
        let selectByFaculty = document.getElementById("selectByFaculty");
        selectByFaculty = selectByFaculty.options[selectByFaculty.selectedIndex];
        
        while(studenttabledata.children.length > 0) {
            studenttabledata.removeChild(studenttabledata.children[0]);
        }

        for(let i=0; i<student_data.length; i++) {
            if(student_data[i].faculty == selectByFaculty.text)
            {
                let row = studenttabledata.insertRow();
                
                let NIM = row.insertCell(0);
                NIM.innerHTML = student_data[i].NIM;

                let fullName = row.insertCell(1);
                fullName.innerHTML = student_data[i].fullName;

                let gender = row.insertCell(2);
                gender.innerHTML = student_data[i].gender;

                let faculty = row.insertCell(3);
                faculty.innerHTML = student_data[i].faculty;

                let programOfStudy = row.insertCell(4);
                programOfStudy.innerHTML = student_data[i].programOfStudy;

                let removeButton_cell = row.insertCell(5);
                
                let removeButton = document.createElement("button");
                removeButton.classList.add("btn-danger");
                removeButton.innerHTML = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person-x-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z'/></svg>";
                removeButton.addEventListener('click', (e) => {
                    student_data.splice(i, 1);
                    refresh_studenttabledata();
                })

                removeButton_cell.appendChild(removeButton);
            }
        }
    }

    function searchby_ProgramOfStudy() {
        let selectByProgramOfStudy = document.getElementById("selectByProgramOfStudy");
        selectByProgramOfStudy = selectByProgramOfStudy.options[selectByProgramOfStudy.selectedIndex];
        
        while(studenttabledata.children.length > 0) {
            studenttabledata.removeChild(studenttabledata.children[0]);
        }

        for(let i=0; i<student_data.length; i++) {
            if(student_data[i].programOfStudy == selectByProgramOfStudy.text)
            {
                let row = studenttabledata.insertRow();
                
                let NIM = row.insertCell(0);
                NIM.innerHTML = student_data[i].NIM;

                let fullName = row.insertCell(1);
                fullName.innerHTML = student_data[i].fullName;

                let gender = row.insertCell(2);
                gender.innerHTML = student_data[i].gender;

                let faculty = row.insertCell(3);
                faculty.innerHTML = student_data[i].faculty;

                let programOfStudy = row.insertCell(4);
                programOfStudy.innerHTML = student_data[i].programOfStudy;

                let removeButton_cell = row.insertCell(5);
                
                let removeButton = document.createElement("button");
                removeButton.classList.add("btn-danger");
                removeButton.innerHTML = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-person-x-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z'/></svg>";
                removeButton.addEventListener('click', (e) => {
                    student_data.splice(i, 1);
                    refresh_studenttabledata();
                })

                removeButton_cell.appendChild(removeButton);
            }
        }
    }

    refresh_studenttabledata();
