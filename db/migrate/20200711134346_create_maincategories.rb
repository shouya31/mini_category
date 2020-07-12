class CreateMaincategories < ActiveRecord::Migration[6.0]
  def change
    create_table :maincategories do |t|
      t.string :name

      t.timestamps
    end
  end
end
