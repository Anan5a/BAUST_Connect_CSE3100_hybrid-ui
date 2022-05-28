import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: any;
  private isLoading: Boolean = false;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController
  ) {
  }

  async showLoader(message = 'Processing Server Request',duration= 6000) {
    this.isLoading = true
    this.loadingController.create({
      message: message,
      duration:duration
    }).then((res) => {
      res.present().then(() => {
        if (!this.isLoading) {
          res.dismiss().then(() => console.log('abort presenting'));
        }
      })
      /*res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });*/
    });
  }

  async hideLoader() {
      let topLoader = await this.loadingController.getTop();
      while (topLoader != null) {
        if (!(await topLoader.dismiss())) {
          break
        }
        topLoader = await this.loadingController.getTop();
      }


/*    this.isLoading = false
    this.loadingController.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });*/

  }

  async showToast(message, color = undefined, duration = 4500, icon = "information-circle-sharp") {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color,
      icon: icon
    });
    await toast.present();
  }

  async showAlert(message, title = "Alert", sub_title = "") {
    const alert = await this.alertController.create({
      header: title,
      subHeader: sub_title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
    //const result = await alert.onDidDismiss();
  }
}
