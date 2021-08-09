import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IamAuthenticator } from "ibm-watson/auth";
import SpeechToTextV1 = require("ibm-watson/speech-to-text/v1-generated");

@Injectable()
export class WatsonService {
  auth: IamAuthenticator;
  speechToText: SpeechToTextV1;
  constructor(readonly configService: ConfigService) {
    this.auth = new IamAuthenticator({
      apikey: this.configService.get("WATSON_API_KEY"),
      url: this.configService.get("WATSON_URL")
    });
    this.speechToText = new SpeechToTextV1({
      authenticator: this.auth
    });
  }

  async transcribe(
    buffer: Buffer
  ): Promise<SpeechToTextV1.Response<SpeechToTextV1.SpeechRecognitionResults>> {
    return this.speechToText.recognize({
      audio: buffer,
      contentType: SpeechToTextV1.RecognizeConstants.ContentType.AUDIO_WEBM_CODECS_OPUS
    });
  }
}
