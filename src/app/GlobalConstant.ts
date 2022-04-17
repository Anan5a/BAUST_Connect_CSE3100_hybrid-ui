import {environment} from "../environments/environment";

export class GlobalConstant {
  public static apiUrl = environment.apiUrl
  public static siteRoot = environment.siteRoot
  public static appName = environment.appName
  public static appDescription = environment.appDescription
}
