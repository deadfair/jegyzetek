// nest new projectnév              // uj project 
// npm run start:dev    // nest start --watch    
// teszteléshez elindul a szerver => localhost:3000
// => postman-al lehet tesztelni

// nest g controller cnév           // kontroller kreálása  
// nest g service snév              // service kreálása

//------------------------------------------------------------------------------------------------------------------------------------------
// Get      = adat/-ok      Lekérdezése              a tábla/Api -ból
// Post     =               Felvitele, Create
// Put      =               Update?
// Update   =
// Delete
// Patch
//------------------------------------------------------------------------------------------------------------------------------------------
// app.module.ts
controllers[StudentController]      // mindne kontroller

//------------------------------------------------------------------------------------------------------------------------------------------
// Kontroller, biznisz logika, xxx.controller.ts:
import {Controller, Get,Post,Put, Param, Body} from "@nestjs/common";

@Controller("students")             // => localhost:3000/students
export class StudentController{

    @Get()                          // lekérés
    getStudents():FindStudentResponseDto[]{
        return "Minden student"
    }

    @Get('/:studentId')             // dinamikus id alapú
    getStudentById(
//      @Param() params:{studentId:string}          // objektumot adunk vissza
        @Param('studentId') studentId:string        // Csak az ID-t adjuk vissza
    ):FindStudentResponseDto{
//      return params;
        return `Get Student With Id of ${studentId}`
    }

    @Post()                         // Create
    createStudent(
        @Body() body:CreateStudentDto   // az egész objektum 
//      @Body('name') name              // csak a név      
        ):StudentResponseDto{
        return `create student with te following data ${JSON.stringify(body)}`
    }

    @Put('/:studentId')
    updateStudent(
        @Param('studentId') studentId:string,
        @Body() body:UpdateStudentDto
    ):StudentResponseDto{
        return `update student by id with id of ${studentId} with data of ${JSON.stringify(body)}`
    }

}

//------------
@Controller("teachers")             
export class TeacherController{

    @Get()                          
    getTeachers():FindTeacherResponseDto[]{
        return "Minden student"
    }

    @Get('/:teacherId')             
    getTeacherById(
        @Param('teacherId') teacherId:string
    ):FindTeacherResponseDto{
        return `Get teacher with Id of ${teacherId}`
    }

/*  @Get('/:teacherId/students')                // ezt  
    getStudents(){
        return "Get Student By Id"
    }

    @Put('/:teacherId/students/studentId')      // és ezt, egy uj kontrollerbe 
    updateStudentTeacher(){
    }*/
}

//------------
@Controller('/:teacherId/students')             
export class StudentTeacherController{


    @Get()                 
    getStudents(
        @Param('teacherId') teacherId:string
    ):FindStudentResponseDto[]{
        return `Get All Students that Belong to a teacher with an id of ${teacherId}`
    }

    @Put('/studentId')      
    updateStudentTeacher(
        @Param('teacherId') teacherId:string,
        @Param('studentId') studentId:string

    ):StudentResponseDto{
        return `update student with id of ${studentId} to teacher with id of ${teacherId}`
    }
}


//------------------------------------------------------------------------------------------------------------------------------------------
// xxx.dto.ts

// student.dto.ts:
export class CreateStudentDto{
    name:string;
    teacher:string
}

export class UpdateStudentDto{      // más body-t akarunk használni creatre, update-ra stb..
    name:string;
    teacher:string
}

export class FindStudentResponseDto{
    id:string;
    name:string;
    teacher:string;
}
export class StudentResponseDto{
    id:string;
    name:string;
    teacher:string;
}

//------------
// teacher.dto.ts:
export class FindTeacherResponseDto{
    id:string;
    name:string;
}

//------------------------------------------------------------------------------------------------------------------------------------------
// services

// student.service.ts:



//------------------------------------------------------------------------------------------------------------------------------------------
// db.ts:
export let teachers=[
    {
        id:"01010110",
        name:"kiki"
    },
    {
        id:"2121212",
        name:"Bi"
    }
]
export let students:[
    {
        id:"2323",
        name:"jani",
        teacher:"Bi"
    },
    {
        id:"32323",
        name:"jonás",
        teacher:"Bi"
    }
]
