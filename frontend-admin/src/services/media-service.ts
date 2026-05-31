import { USE_MOCK } from "../config/env";
import { MediaServiceApi } from "./media-service.api";
import { MediaServiceMock } from "./media-service.mock";

const MediaService = USE_MOCK ? MediaServiceMock : MediaServiceApi;

export { MediaService };
