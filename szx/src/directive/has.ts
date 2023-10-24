import pinia from '@/store'
import useUserStore from '@/store/modules/user';
const userStore = useUserStore(pinia);
export const isHasButton = (app: any) => {
    console.log(app);
    app.directive('has', {

        mounted(el, option) {
            console.log(el);
            console.log(option);

            if (!userStore.buttons.includes(option.value)) {
                el.parentNode.removeChild(el)

            }



        }
    })
    // app.directive('has', {
    //     mounted(el) {

    //         console.log(userStore.buttons);

    //     }

    // })
}