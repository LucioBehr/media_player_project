import { USE_MOCK } from "../config/env";
import { PlaylistServiceApi } from "./playlist-service.api";
import { PlaylistServiceMock } from "./playlist-service.mock";

const PlaylistService = USE_MOCK ? PlaylistServiceMock : PlaylistServiceApi;

export { PlaylistService };
