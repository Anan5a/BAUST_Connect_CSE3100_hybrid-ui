import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader: any;
  private isLoading: Boolean = false;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {
  }

  async showLoader(message = 'Processing Server Request') {
    this.isLoading = true
    this.loadingController.create({
      message: message
    }).then((res) => {
      res.present().then(() => {
        if (!this.isLoading) {
          res.dismiss().then(() => console.log('abort presenting'));
        }
      })
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

  async hideLoader() {
    this.isLoading = false
    this.loadingController.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });

  }

  async showToast(message, color = undefined, duration = 4500, icon="information-circle-sharp") {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: color,
      icon:icon
    });
    await toast.present();
  }

}
