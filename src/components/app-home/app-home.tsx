import { Component, h, State } from '@stencil/core';
import * as mobilenet from '@tensorflow-models/mobilenet';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})

export class AppHome {
  @State() file: File;
  @State() filePath: string;
  @State() prediction: string;
  @State() probability: number;
  @State() spinner: Boolean;
  @State() error: Boolean;

  async componentDidLoad() {
  }

  tf = async () => {
    const image = document.getElementById('image') as HTMLImageElement;
    try {
      const model = await mobilenet.load();
      const predictions = await model.classify(image);
      this.prediction = predictions[0].className;
      this.probability = predictions[0].probability;
      this.spinner = false;
    } catch(err) {
      this.error = true;
    }
  }

  render() {
    if (this.error) {
      return <p>Please try again later.</p>
    }
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-grid>
        <ion-row>
          <ion-col size="xl">
            <div style={{ textAlign: 'center' }}>
              <img class="image-preview" id="image" src={this.filePath} />
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="xl">
          <div style={{ height: '80px', textAlign: 'center' }}>
            {this.prediction ?
              <div style={{ position: 'absolute', left: "50%" }}>
                <p style={{ position: "relative", left: "-50%" }}>
                  {this.prediction}
                </p>
              </div> 
              :
              null
            }
            {this.spinner ? <ion-spinner name="bubbles"></ion-spinner> : null}
          </div>
          <form>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                this.prediction = null;
                this.probability = null;
                this.filePath = URL.createObjectURL((event.target as HTMLInputElement).files[0])
              }}
            />
          </form>
          </ion-col>
        </ion-row>
        <ion-row style={{ width: "100%" }}>
          <ion-col>
            <ion-button
              style={{ width: "100%" }}
              onClick={() => {
                this.spinner = true;
                this.tf();
              }}
              color="primary"
            >
              Submit
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>,
      <ion-footer></ion-footer>
    ];
  }
}
