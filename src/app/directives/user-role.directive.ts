import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
} from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { Role } from "../models/role";

@Directive({
  selector: "[appUserRole]",
})
export class UserRoleDirective {
  /*directive for hide some elements*/

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthenticationService
  ) {}

  //userRoles: Role[];
  @Input() appUserRole: Role[];

  ngOnInit() {
    let hasAccess = this.appUserRole.some((r) => this.auth.hasRole(r));

    if (hasAccess) {
      //this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
