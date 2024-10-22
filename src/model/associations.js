// modelAssociations.js

import QAPair from "./QaPairs.js";
import Tag from "./tag.js";
import QuickReplyTemplate from './QuickReplyTemplate.js';
import QuickReplyOption from './QuickReplyOption.js';

// Existing associations
QAPair.belongsToMany(Tag, { through: "QATags" });
Tag.belongsToMany(QAPair, { through: "QATags" });

// New Quick Reply associations
QuickReplyTemplate.hasMany(QuickReplyOption, { foreignKey: 'templateId' });
QuickReplyOption.belongsTo(QuickReplyTemplate, { foreignKey: 'templateId' });

// Export all models
export { QAPair, Tag, QuickReplyTemplate, QuickReplyOption };