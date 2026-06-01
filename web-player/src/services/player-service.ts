import { USE_MOCK } from "../config/env";
import { PlayerServiceApi } from "./player-service.api";
import { PlayerServiceMock } from "./player-service.mock";

const PlayerService = USE_MOCK ? PlayerServiceMock : PlayerServiceApi;

export { PlayerService };
