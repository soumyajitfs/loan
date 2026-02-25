export type DocumentCategory = "ID" | "Income" | "Property" | "Discharge" | "Compliance";

export interface UploadValidationInput {
  fileName: string;
  fileType: string;
  category: DocumentCategory | "";
  hasMetadata: boolean;
  hasSignatureField: boolean;
  idExpiryValid: boolean;
  kycSatisfied: boolean;
}

export interface UploadValidationResult {
  requiredCategoryPresent: boolean;
  fileTypeValid: boolean;
  mandatoryMetadataPresent: boolean;
  signatureFieldPresent: boolean;
  idExpiryValid: boolean;
  kycRulesSatisfied: boolean;
  passed: boolean;
  classifiedCategory: DocumentCategory | "Unclassified";
}

const allowedFileTypes = ["pdf", "png", "jpg", "jpeg"];

export function classifyDocument(fileName: string, selectedCategory: UploadValidationInput["category"]): UploadValidationResult["classifiedCategory"] {
  if (selectedCategory) return selectedCategory;

  const lowered = fileName.toLowerCase();
  if (lowered.includes("income")) return "Income";
  if (lowered.includes("property")) return "Property";
  if (lowered.includes("discharge")) return "Discharge";
  if (lowered.includes("compliance")) return "Compliance";
  if (lowered.includes("id") || lowered.includes("kyc")) return "ID";
  return "Unclassified";
}

export function runUploadValidation(input: UploadValidationInput): UploadValidationResult {
  const ext = input.fileType.toLowerCase().replace(".", "");
  const requiredCategoryPresent = input.category !== "";
  const fileTypeValid = allowedFileTypes.includes(ext);
  const mandatoryMetadataPresent = input.hasMetadata;
  const signatureFieldPresent = input.hasSignatureField;
  const idExpiryValid = input.idExpiryValid;
  const kycRulesSatisfied = input.kycSatisfied;

  const passed =
    requiredCategoryPresent &&
    fileTypeValid &&
    mandatoryMetadataPresent &&
    signatureFieldPresent &&
    idExpiryValid &&
    kycRulesSatisfied;

  return {
    requiredCategoryPresent,
    fileTypeValid,
    mandatoryMetadataPresent,
    signatureFieldPresent,
    idExpiryValid,
    kycRulesSatisfied,
    passed,
    classifiedCategory: classifyDocument(input.fileName, input.category),
  };
}
