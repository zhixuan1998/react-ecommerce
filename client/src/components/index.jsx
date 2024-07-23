import { lazy, Suspense } from 'react';

// import CustomForm from './CustomForm.jsx';
// import CustomMenu from './CustomMenu.jsx';
// import CustomButton from './CustomButton.jsx';
// import CustomFooter from './CustomFooter.jsx';
// import CustomHeader from './CustomHeader.jsx';
// import CustomPopover from './CustomPopover.jsx';
// import CustomDropdown from './CustomDropdown.jsx';
// import CustomSearchBox from './CustomSearchBox.jsx';
// import CustomSeparator from './CustomSeparator.jsx';
// import CustomPagination from './CustomPagination.jsx';
// import CustomFormControl from './CustomFormControl.jsx';
// import CustomErrorMessage from './CustomErrorMessage.jsx';
// import CustomDatetimePicker from './CustomDatetimePicker.jsx';
// import CustomListingSection from './CustomListingSection.jsx';
// import CustomMiniItemCarousel from './CustomMiniItemCarousel.jsx';
// import CustomSocialLoginButtonGroup from './CustomSocialLoginButtonGroup.jsx';

// export {
//   CustomMenu,
//   CustomForm,
//   CustomButton,
//   CustomFooter,
//   CustomHeader,
//   CustomPopover,
//   CustomDropdown,
//   CustomSearchBox,
//   CustomSeparator,
//   CustomPagination,
//   CustomFormControl,
//   CustomErrorMessage,
//   CustomDatetimePicker,
//   CustomListingSection,
//   CustomMiniItemCarousel,
//   CustomSocialLoginButtonGroup
// };

export const CustomForm = lazy(() => import(`./CustomForm.jsx`));
export const CustomMenu = lazy(() => import('./CustomMenu.jsx'));
export const CustomButton = lazy(() => import('./CustomButton.jsx'));
export const CustomFooter = lazy(() => import('./CustomFooter.jsx'));
export const CustomHeader = lazy(() => import('./CustomHeader.jsx'));
export const CustomLoading = lazy(() => import('./CustomLoading.jsx'));
export const CustomPopover = lazy(() => import('./CustomPopover.jsx'));
export const CustomDropdown = lazy(() => import('./CustomDropdown.jsx'));
export const CustomSearchBox = lazy(() => import('./CustomSearchBox.jsx'));
export const CustomSeparator = lazy(() => import('./CustomSeparator.jsx'));
export const CustomPagination = lazy(() => import('./CustomPagination.jsx'));
export const CustomFormControl = lazy(() => import('./CustomFormControl.jsx'));
export const CustomErrorMessage = lazy(() => import('./CustomErrorMessage.jsx'));
export const CustomDatetimePicker = lazy(() => import('./CustomDatetimePicker.jsx'));
export const CustomListingSection = lazy(() => import('./CustomListingSection.jsx'));
export const CustomMiniItemCarousel = lazy(() => import('./CustomMiniItemCarousel.jsx'));
export const CustomSocialLoginButtonGroup = lazy(() =>
  import('./CustomSocialLoginButtonGroup.jsx')
);
