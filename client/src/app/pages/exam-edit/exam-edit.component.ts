// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { ExamService } from '../../services/exam.service';
import { StudentService } from '../../services/student.service';
import { TeacherService } from '../../services/teacher.service';
import { CourseService } from '../../services/course.service';
// Import Models
import { Exam } from '../../domain/schoolmng_db/exam';
import { Course } from '../../domain/schoolmng_db/course';
import { Student } from '../../domain/schoolmng_db/student';
import { Teacher } from '../../domain/schoolmng_db/teacher';

// START - USED SERVICES
/**
* ExamService.create
*	@description CRUD ACTION create
*
* ExamService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
* ExamService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id resource
*
* StudentService.list
*	@description CRUD ACTION list
*
* TeacherService.list
*	@description CRUD ACTION list
*
* CourseService.list
*	@description CRUD ACTION list
*
* ExamService.Validate
*	@description this is used to validate the exam
*	@param String id ID of the exam
*	@returns Boolean
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Exam
 */
@Component({
    selector: 'app-exam-edit',
    templateUrl: 'exam-edit.component.html',
    styleUrls: ['exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {
    item: Exam;
    list_Course: Course[];
    list_Student: Student[];
    list_Teacher: Teacher[];
    model: Exam;
    formValid: Boolean;

    constructor(
    private examService: ExamService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Exam();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.examService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
            this.courseService.list().subscribe(list => this.list_Course = list);
            this.studentService.list().subscribe(list => this.list_Student = list);
            this.teacherService.list().subscribe(list => this.list_Teacher = list);
        });
    }


    /**
     * Save Exam
     *
     * @param {boolean} formValid Form validity check
     * @param Exam item Exam to save
     */
    save(formValid: boolean, item: Exam): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.examService.update(item).subscribe(data => this.goBack());
            } else {
                this.examService.create(item).subscribe(data => this.goBack());
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



