class ErrorHandler {
  public authXExpMsg: String = "No Authorization token found in headers"
  public authInvalidExpMsg: String = "Un Authorized access token found in headers"
  public authTknSignExpMsg: String = "Invalid access token signature found in headers"
  public userExpMsg: String = "Invalid access Requested User has not been found"
  public usersExpMsg: String = "No Users has not been found"
  public createUserExpMsg: String = "User Creation Failed :("
  public travelMissingExpMsg: String = "Requested Listing has not been found"
  public serverExpMsg: String = "Ooops something went wrong!!!"
  public validatorExpMsg: String = "Incorrect input detected on: "
   
  public async handleError(err: Error): Promise<void> {
    throw new Error(`"Error message from the centralized error-handling component", ${err}`);
    // await sendMailToAdminIfCritical();
    // await sendEventsToSentry();
  }
}
export const errorHandler = new ErrorHandler();
