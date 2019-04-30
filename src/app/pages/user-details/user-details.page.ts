import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
    user: User = {
      nome: '',
      sexo: '',
      email: '',
      senha: ''
    };
    userId = null;

  constructor(
    private route: ActivatedRoute, private nav: NavController,
    private userService: UserService, private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    if(this.userId){
      this.loadUser();
    }
  }

 async loadUser(){
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.userService.getUser(this.userId).subscribe(res=>{
      loading.dismiss();
      this.user = res;
    })
  }

  async saveUser(){
    const loading = await this.loadingController.create({
      message: 'Salvando...'
    });
    await loading.present();

    if(this.userId){
       //Update
       this.userService.updateUser(this.user, this.userId).then(()=>{
         loading.dismiss();
         this.nav.navigateForward('/');
       });
    }else{
      // Add new
      this.userService.addUser(this.user).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  onRemove(idUser:string){
    this.userService.removeUser(idUser);
  }

}
