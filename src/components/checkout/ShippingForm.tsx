import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ShippingFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    saveInfo: boolean;
  };
  onSubmit: (values: ShippingFormProps['initialData']) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ initialData, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      address: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      zipCode: Yup.string().required('ZIP code is required'),
      country: Yup.string().required('Country is required')
    }),
    onSubmit: values => {
      onSubmit(values);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
      
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.lastName}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address*
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              formik.touched.address && formik.errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State*
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.state && formik.errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.state}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code*
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.zipCode && formik.errors.zipCode ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.zipCode}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country*
            </label>
            <select
              id="country"
              name="country"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formik.touched.country && formik.errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="IND">India</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.country}</p>
            )}
          </div>
        </div>
        
        <div className="mb-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="saveInfo"
              className="h-4 w-4 text-indigo-600 rounded"
              checked={formik.values.saveInfo}
              onChange={formik.handleChange}
            />
            <span className="ml-2 text-sm text-gray-600">
              Save this information for next time
            </span>
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          >
            Continue to Payment
            <ChevronRight className="h-5 w-5 ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;