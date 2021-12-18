// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { StudentService } from '../../services/student.service';
import { ExamService } from '../../services/exam.service';
import { CourseService } from '../../services/course.service';
// Import Models
import { Student } from '../../domain/schoolmng_db/student';
import { Exam } from '../../domain/schoolmng_db/exam';
import { Course } from '../../domain/schoolmng_db/course';

// START - USED SERVICES
/**
* StudentService.create
*	@description CRUD ACTION create
*
* StudentService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* StudentService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* ExamService.findBy_Student
*	@description CRUD ACTION findBy_Student
*	@param Objectid key Id of model to search for
*
* CourseService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Student
 */
@Component({
    selector: 'app-student-edit',
    templateUrl: 'student-edit.component.html',
    styleUrls: ['student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
    item: Student;
    list_courses: Course[];
    externalExam__Student: Exam[];
    model: Student;
    formValid: Boolean;

    constructor(
    private studentService: StudentService,
    private examService: ExamService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Student();
        this.externalExam__Student = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.studentService.get(id).subscribe(item => this.item = item);
                this.examService.findBy_Student(id).subscribe(list => this.externalExam__Student = list);
            }
            // Get relations
            this.courseService.list().subscribe(list => this.list_courses = list);
        });
    }

    /**
     * Check if an Course is in  _courses
     *
     * @param {string} id Id of Course to search
     * @returns {boolean} True if it is found
     */
    containCourse(id: string): boolean {
        if (!this.item._courses) return false;
        return this.item._courses.indexOf(id) !== -1;
    }

    /**
     * Add Course from Student
     *
     * @param {string} id Id of Course to add in this.item._courses array
     */
    addCourse(id: string) {
        if (!this.item._courses)
            this.item._courses = [];
        this.item._courses.push(id);
    }

    /**
     * Remove an Course from a Student
     *
     * @param {number} index Index of Course in this.item._courses array
     */
    removeCourse(index: number) {
        this.item._courses.splice(index, 1);
    }

    /**
     * Save Student
     *
     * @param {boolean} formValid Form validity check
     * @param Student item Student to save
     */
    save(formValid: boolean, item: Student): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.studentService.update(item).subscribe(data => this.goBack());
            } else {
                this.studentService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}



