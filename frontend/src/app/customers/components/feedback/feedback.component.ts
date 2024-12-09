import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-feedback',
  imports: [FormsModule,NgFor],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
    feedback:any = {
      comments: '',
      rating: 0
    }

    userId:string| null = null;
    @Input() orderId:string | null = null;
    constructor(
      private feedbackService:FeedbackService,
      private toastr:ToastrService,
      private authService:AuthService
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.currentUser.userId;
    }

    async submitFeedback(){
      try{
        const payload = {
          ...this.feedback,
          userId:this.userId,
          orderId:this.orderId
        }
        await this.feedbackService.addFeedback(payload)
        this.toastr.success("Feedback added")
      }catch(e){
        console.log(e);
      }
    }
}
