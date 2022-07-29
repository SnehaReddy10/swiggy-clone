import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLoading: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  showAlert(message: string, header?, buttonArray?){
    this.alertCtrl.create({
      header: header ? header : 'Authentication Failed',
      message: message,
      buttons: buttonArray ? buttonArray : ['Okay']
    })
    .then(alertEl => alertEl.present());
  }

  setLoader(){
    this.isLoading = !this.isLoading;
  }

  async showToast(msg, color, position,  duration = 3000){
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: duration,
        color: color,
        position : position
      });
      toast.present();
  }

  errorToast(msg?, duration = 4000){
      this.showToast(msg ? msg : 'No internet connection', 'danger', 'bottom', duration);
  }

  successToast(msg?, duration = 4000){
    this.showToast(msg, 'success', 'bottom');
}

showLoader(msg?, spinner?){
  // this.isLoading = true;
  if(!this.isLoading) this.setLoader();
  return this.loadingCtrl.create({
    message: msg,
    spinner: spinner ? spinner : 'bubbles',
  }).then(res => {
    res.present().then(() => {
      if(!this.isLoading){
        res.dismiss().then(() => {
          console.log('Abort presenting');
        });
      }
    })
    })
    .catch(e => {
      console.log('Show loading error: ', e);
  });
}

  hideLoader(){
    // this.isLoading = false;
    if(this.isLoading) this.setLoader();
    return this.loadingCtrl.dismiss().then(() => console.log('Dismissed'))
    .catch(e => console.log('Error hide loader: ', e));
  }

  async createModal(options){
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    const {data}= await modal.onWillDismiss();
    console.log(data);
    if(data) return data;
  }

  modalDismiss(val?){
      let data: any = val? val : null;
      console.log('data', data);
      this.modalCtrl.dismiss(data);
  }

  getIcon(title){
    const name = title.toLowerCase();
    switch(name){
        case 'home': return 'home-outline';
        case 'work' : return 'briefcase-outline';
        default: return 'location-outline';

    }
  }
}
