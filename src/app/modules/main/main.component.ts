import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.sass"],
})
export class MainComponent implements OnInit {
  constructor() {
    var dynamicScripts = ["../assets/plugins/jquery-ui/jquery-ui.min.js"];

    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }

  ngOnInit() {}
}
