import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, taskCreate, TaskService } from '../../data-acces/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styles: ``,
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);

  loading = signal(false);

  idTask = input.required<string>();

  form = this._formBuilder.group({
    title: this._formBuilder.control('', Validators.required),
    completed: this._formBuilder.control(false, Validators.required),
  });

  constructor() {
    effect(() => {
      console.log(this.idTask());

      const id = this.idTask();
      if (id) {
        this.getTask(id);
      }
    });
  }

  async submit() {
    this.loading.set(true);
    if (this.form.valid) {
      try {
        const { title, completed } = this.form.value;
        const task: taskCreate = {
          title: title || '',
          completed: !!completed,
        };
        const id = this.idTask();
        if (id) {
          await this._taskService.update(task, id);
        } else {
          await this._taskService.create(task);
        }
        toast.success(`Tarea ${id ? 'actualizada' : 'creada'} correctamente`);
        this._router.navigateByUrl('/tasks');
      } catch (error) {
        toast.error('Error al crear la tarea');
      } finally {
        this.loading.set(false);
      }
    }
  }

  async getTask(id: string) {
    const taskSnapshot = await this._taskService.getTask(id);
    if (!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue({
      title: task.title,
      completed: task.completed,
    });
  }
}
