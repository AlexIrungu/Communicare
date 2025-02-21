class OutbreakHistory < ApplicationRecord
  belongs_to :communicable_disease
  belongs_to :area
end
