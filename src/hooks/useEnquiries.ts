import { useState, useEffect, useCallback } from 'react';
import { Enquiry, EnquiryFormData, EnquiryStatus, EnquiryPriority } from '../types/enquiry';
import { getEnquiries, submitEnquiry as submitEnquiryApi, updateEnquiryStatus, addEnquiryNote } from '../lib/dataService';

export function useEnquiries(initialFilter?: { type?: string; status?: string; search?: string }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async (filter?: { type?: string; status?: string; search?: string }) => {
    try {
      setLoading(true);
      const data = await getEnquiries(filter);
      setEnquiries(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch customer enquiries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries(initialFilter);
  }, [fetchEnquiries, initialFilter]);

  const submitNewEnquiry = async (formData: EnquiryFormData) => {
    try {
      const res = await submitEnquiryApi(formData);
      await fetchEnquiries();
      return res;
    } catch (err: any) {
      throw new Error(err.message || 'Failed to submit enquiry');
    }
  };

  const updateStatus = async (id: string, status: EnquiryStatus, priority?: EnquiryPriority) => {
    const success = await updateEnquiryStatus(id, status, priority);
    if (success) {
      await fetchEnquiries();
    }
    return success;
  };

  const addNote = async (enquiryId: string, noteText: string) => {
    const success = await addEnquiryNote(enquiryId, noteText);
    if (success) {
      await fetchEnquiries();
    }
    return success;
  };

  return {
    enquiries,
    loading,
    error,
    refetchEnquiries: fetchEnquiries,
    submitNewEnquiry,
    updateStatus,
    addNote
  };
}
