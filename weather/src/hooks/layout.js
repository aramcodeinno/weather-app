import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
    DESKTOP_LAYOUT_WIDTH_BREAKPOINT,
    LAYOUT_MODE,
    TABLET_LAYOUT_WIDTH_BREAKPOINT,
} from "../constants/layout";

export const useLayout = () => {
    const applyDesktopLayout = useMediaQuery(
        `(min-width:${DESKTOP_LAYOUT_WIDTH_BREAKPOINT}px)`
    );
    const applyTabletLayout = useMediaQuery(
        `(min-width:${TABLET_LAYOUT_WIDTH_BREAKPOINT}px)`
    );
    let mode = LAYOUT_MODE.mobile;
    if (applyDesktopLayout) {
        mode = LAYOUT_MODE.desktop;
    } else if (applyTabletLayout) {
        mode = LAYOUT_MODE.tablet;
    }
    return {
        mode,
    };
};
