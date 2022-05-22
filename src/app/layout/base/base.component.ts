import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

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
