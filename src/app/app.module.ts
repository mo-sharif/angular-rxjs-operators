import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import DataService from "./data.service";
import { IntroComponent } from "./components/intro.component";
import { FooterComponent } from "./components/footer.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, IntroComponent, FooterComponent],
  bootstrap: [AppComponent],
  providers: [DataService]
})
export class AppModule {}
