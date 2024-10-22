import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';
const promptTypeEnum = ["text", "few-shot", "chain-of-thought", "multimedia"];
const promptStatusEnum = [
  "draft",
  "in_review",
  "changes_requested",
  "approved",
  "archived",
];
const promptDomainEnum = [
  "HR",
  "Finance",
  "Sales",
  "Marketing",
  "CustomerService",
  "IT",
  "Legal",
  "General",
];
const promptSubdomainEnum = [
  "Recruitment",
  "Onboarding",
  "PerformanceManagement",
  "Training",
  "Accounting",
  "Budgeting",
  "FinancialPlanning",
  "Reporting",
  "ContentCreation",
  "SocialMedia",
  "EmailMarketing",
  "SEO",
  "Ticketing",
  "CustomerInquiries",
  "Feedback",
  "NetworkManagement",
  "Security",
  "DataManagement",
  "Contracts",
  "Compliance",
  "IntellectualProperty",
  "Administration",
  "Communication",
  "ProjectManagement",
];

const Prompts = sequelize.define(
  "Prompts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM(promptTypeEnum),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(promptStatusEnum),
      allowNull: false,
      defaultValue: "draft",
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
    },
    version_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    domain: {
      type: DataTypes.ENUM(promptDomainEnum),
      allowNull: false,
    },
    subdomain: {
      type: DataTypes.ENUM(promptSubdomainEnum),
    },
    business_process: {
      type: DataTypes.STRING(255),
    },
    target_audience: {
      type: DataTypes.STRING(255),
    },
    complexity_level: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
    matched_intents: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    matched_entities: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    updated_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    tableName: "Prompts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Prompts; 
