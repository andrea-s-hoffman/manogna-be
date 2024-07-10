import { ObjectId } from "mongodb";

export default interface Job {
  _id?: ObjectId;
  companyName: string;
  jobTitle: string;
  jobIndustry: string;
  jobGeo?: string;
  jobURL?: string;
  status?: string;
  timeApplied?: string;
  notes?: string;
  accountId: string;
}
