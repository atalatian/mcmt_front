import {UseQueryResult} from "@tanstack/react-query";
import { Camera } from "../ViewModel/CamerasDataContext";

export const CamerasDataProxy = (cameras: UseQueryResult<Camera[]>) => {
    const handler = {
        get(target: UseQueryResult<Camera[]>, property: any) {
            switch (property) {
                case "data":
                    if (Reflect.get(target, "data") === undefined){
                        return [];
                    } else {
                        return Reflect.get(target, "data");
                    }
                default:
                    return Reflect.get(target, property);
            }
        },
    }

    return new Proxy(cameras, handler);
}
export const CamerasFilterProxy = (cameras: UseQueryResult<Camera[]>, filterArray: ((cameras: Camera[]) => Camera[])[]) => {

    const handler = {
        get(target: UseQueryResult<Camera[]>, property: any) {
            switch (property) {
                case "data":
                    let filteredCameras;
                    filterArray.forEach((filter) => {
                        filteredCameras = filter(Reflect.get(target, "data")!);
                    })
                    return filteredCameras;
                default:
                    return Reflect.get(target, property);
            }
        },
    }


    return new Proxy(cameras, handler);
}