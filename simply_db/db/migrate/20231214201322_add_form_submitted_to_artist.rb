class AddFormSubmittedToArtist < ActiveRecord::Migration[7.0]
  def change
    add_column :artists, :form_submitted, :boolean, default: false
  end
end
