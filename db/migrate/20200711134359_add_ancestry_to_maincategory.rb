class AddAncestryToMaincategory < ActiveRecord::Migration[6.0]
  def change
    add_column :maincategories, :ancestry, :string
    add_index :maincategories, :ancestry
  end

  def down
    remove_index :maincategories, :ancestry
    remove_column :maincategories, :ancestry
  end
end
