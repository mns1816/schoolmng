// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { TeacherService } from '../../services/teacher.service';
import { ExamService } from '../../services/exam.service';
import { CourseService } from '../../services/course.service';
// Import Models
import { Teacher } from '../../domain/schoolmng_db/teacher';
import { Exam } from '../../domain/schoolmng_db/exam';
import { Course } from '../../domain/schoolmng_db/course';

// START - USED SERVICES
/**
* TeacherService.create
*	@description CRUD ACTION create
*
* TeacherService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* TeacherService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* ExamService.findBy_Teacher
*	@description CRUD ACTION findBy_Teacher
*	@param Objectid key Id of model to search for
*
* CourseService.list
*	@description CRUD ACTION list
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Teacher
 */
@Component({
    selector: 'app-teacher-edit',
    templateUrl: 'teacher-edit.component.html',
    styleUrls: ['teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {
    item: Teacher;
    list_courses: Course[];
    externalExam__Teacher: Exam[];
    model: Teacher;
    formValid: Boolean;

    constructor(
    private teacherService: TeacherService,
    private examService: ExamService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Teacher();
        this.externalExam__Teacher = [];
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.teacherService.get(id).subscribe(item => this.item = item);
                this.examService.findBy_Teacher(id).subscribe(list => this.externalExam__Teacher = list);
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
     * Add Course from Teacher
     *
     * @param {string} id Id of Course to add in this.item._courses array
     */
    addCourse(id: string) {
        if (!this.item._courses)
            this.item._courses = [];
        this.item._courses.push(id);
    }

    /**
     * Remove an Course from a Teacher
     *
     * @param {number} index Index of Course in this.item._courses array
     */
    removeCourse(index: number) {
        this.item._courses.splice(index, 1);
    }

    /**
     * Save Teacher
     *
     * @param {boolean} formValid Form validity check
     * @param Teacher item Teacher to save
     */
    save(formValid: boolean, item: Teacher): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.teacherService.update(item).subscribe(data => this.goBack());
            } else {
                this.teacherService.create(item).subscribe(data => this.goBack());
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



