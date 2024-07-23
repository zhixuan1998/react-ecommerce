import httpClient from '@/utils/http';

const lookupRepository = () => {
    return {
        async getCountryPhoneCodes() {
            return await httpClient.get(`/users/lookup/countries/phoneCodes`);
        },

        getSearchProductAreas() {
            return [
                { key: 'brand', value: 'Search within brand' },
                { key: 'category', value: 'Search within category' },
                { key: 'all', value: 'Search product' }
            ];
        },

        getRecordPerPageOptions() {
            return [
                { key: '10', value: 10 },
                { key: '25', value: 25 },
                { key: '50', value: 50 },
                { key: '100', value: 100 }
            ];
        },
    };
};

export default lookupRepository;
