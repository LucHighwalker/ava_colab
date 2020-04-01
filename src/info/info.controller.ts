import * as info from "./info.json";

class InfoController {
    getInfo() {
        return info;
    }
}

export default new InfoController();
