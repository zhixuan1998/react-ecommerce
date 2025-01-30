import { lazy, Suspense } from 'react';

const createLazyComponent = (Component) => {
  return function LazyComponent(props) {
    return (
      <Suspense fallback={<></>}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export const CustomForm = createLazyComponent(lazy(() => import(`./CustomForm.jsx`)));
export const CustomMenu = createLazyComponent(lazy(() => import('./CustomMenu.jsx')));
export const CustomButton = createLazyComponent(lazy(() => import('./CustomButton.jsx')));
export const CustomFooter = createLazyComponent(lazy(() => import('./CustomFooter.jsx')));
export const CustomHeader = createLazyComponent(lazy(() => import('./CustomHeader.jsx')));
export const CustomLoading = createLazyComponent(lazy(() => import('./CustomLoading.jsx')));
export const CustomPopover = createLazyComponent(lazy(() => import('./CustomPopover.jsx')));
export const CustomDropdown = createLazyComponent(lazy(() => import('./CustomDropdown.jsx')));
export const CustomSearchBox = createLazyComponent(lazy(() => import('./CustomSearchBox.jsx')));
export const CustomSeparator = createLazyComponent(lazy(() => import('./CustomSeparator.jsx')));
export const CustomPagination = createLazyComponent(lazy(() => import('./CustomPagination.jsx')));
export const CustomFormControl = createLazyComponent(lazy(() => import('./CustomFormControl.jsx')));
export const CustomErrorMessage = createLazyComponent(lazy(() => import('./CustomErrorMessage.jsx')));
export const CustomDatetimePicker = createLazyComponent(lazy(() => import('./CustomDatetimePicker.jsx')));
export const CustomListingSection = createLazyComponent(lazy(() => import('./CustomListingSection.jsx')));
export const CustomMiniItemCarousel = createLazyComponent(lazy(() => import('./CustomMiniItemCarousel.jsx')));
export const CustomSocialLoginButtonGroup = createLazyComponent(lazy(() =>
  import('./CustomSocialLoginButtonGroup.jsx')
));
