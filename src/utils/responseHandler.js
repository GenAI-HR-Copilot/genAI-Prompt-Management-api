import ResponseEntity from "../utils/responseEntity.js";
import { Constants } from "./constant.js";

class ResponseHandler {

  static async handelImageNotFound(res) {
    const errorResponse = new ResponseEntity(
      null,
      false,
      Constants.errorNoImage
    );
    logger.writeLog(errorResponse);
    res.status(400).json(errorResponse);
  }

  static async handelServerDataCreated(res, data) {
    const response = new ResponseEntity(
      data,
      Constants.HTTPCREATED,
      Constants.successStatus,
      Constants.dataSave
    );
    res.status(201).json(response);
  }

  static async handelServerDataGet(res, data) {
    const response = new ResponseEntity(
      data,
      Constants.HTTPOK,
      Constants.successStatus,
      Constants.dataFetch
    );
    res.status(200).json(response);
  }

  static async handelExistEmail(res, data) {
    const response = new ResponseEntity(
      data,
      Constants.HTTPNOCONTENT,
      Constants.failedStatus,
      Constants.existEmail
    );
    res.status(200).json(response);
  }

  static async handelDataNotFound(res) {
    const response = new ResponseEntity(
      null,
      Constants.HTTPNOCONTENT,
      Constants.failedStatus,
      Constants.dataNotFound
    );
    res.status(200).json(response);
  }

  static async handelServerSuccess(res, data, string) {
    const response = new ResponseEntity(
      data,
      Constants.HTTPOK,
      Constants.successStatus,
      string
    );
    res.status(200).json(response);
  }

  static handelUnauthorized(res) {
    const response = new ResponseEntity(
      null,
      Constants.UNAUTHORIZED,
      Constants.failedStatus,
      Constants.unauthorized
    );
    res.status(401).json(response);
  }

  static handelInvalidEmail(res) {
    const response = new ResponseEntity(
      null,
      Constants.HTTPNOCONTENT,
      Constants.failedStatus,
      Constants.invalidEmail
    );
    res.status(400).json(response);
  }

  static async handelDataDelete(res) {
    const response = new ResponseEntity(
      null,
      Constants.HTTPNOCONTENT,
      Constants.successStatus,
      Constants.dataDelete
    );
    res.status(200).json(response);
  }

  static async handelDataUpdate(res) {
    const response = new ResponseEntity(
      null,
      Constants.HTTPOK,
      Constants.successStatus,
      Constants.dataUpdataSucess
    );
    res.status(200).json(response);
  }

  static handelDataUnique(res, unique) {
    const response = new ResponseEntity(
      null,
      Constants.internalServerError,
      Constants.failedStatus,
      `${unique} Must be Unique`
    );
    res.status(500).json(response);
  }

  static async handelDataInvalid(res) {
    const response = new ResponseEntity(
      null,
      Constants.unprocessablecontent,
      Constants.failedStatus,
      Constants.invalidData
    );
    res.status(422).json(response);
  }

  static async handelDataCustomRespone(res, message) {
    const response = new ResponseEntity(
      null,
      Constants.HTTPNOCONTENT,
      Constants.failedStatus,
      message
    );
    res.status(200).json(response);
  }
}

export default ResponseHandler;
